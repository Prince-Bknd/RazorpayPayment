package com.razorpay.payment.service;

import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.payment.config.RazorpayConfig;
import com.razorpay.payment.request.PaymentRequest;
import com.razorpay.payment.response.CustomResponse;
import com.razorpay.payment.response.PaymentOrderResponse;
import com.razorpay.payment.response.PaymentResponse;

import jakarta.annotation.PostConstruct;

import java.util.UUID;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
	private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    private RazorpayClient razorpayClient;
    
    @Value("${razorpay.key_id}")
    private String keyId;
    
    @Value("${razorpay.key_secret}")
    private String secretKey;
    
    @PostConstruct
	public void init() {
		try {
			this.razorpayClient = new RazorpayClient(keyId, secretKey);
		} catch (RazorpayException e) {
			throw new RuntimeException("Failed to initialize Razorpay client", e);
		}
	}

    public CustomResponse<PaymentOrderResponse> createOrder(PaymentRequest paymentRequest) {
    	try {
			logger.info("Initiated Payment");
			logger.info("CURRENTLY, NOT STORING IN DATABASE!!");
			JSONObject orderRequest = new JSONObject();
			// Convert amount to paise (multiply by 100)
			orderRequest.put("amount", paymentRequest.getAmount() * 100);
			orderRequest.put("currency", paymentRequest.getCurrency() != null ? paymentRequest.getCurrency() : "INR");
			orderRequest.put("payment_capture", 1);
			orderRequest.put("receipt", paymentRequest.getReceipt() != null ? paymentRequest.getReceipt() : "txn_" + UUID.randomUUID().toString());
			Order order = this.razorpayClient.orders.create(orderRequest);
			System.out.println("Order Created: " + order);
			PaymentOrderResponse response = new PaymentOrderResponse();
			// Return amount in paise for Razorpay frontend
			response.setAmount(String.valueOf(paymentRequest.getAmount() * 100));
			response.setOrderId(order.get("id"));
			response.setPaymentId(UUID.randomUUID().toString());
			response.setReceiptId(order.get("receipt"));
			return new CustomResponse<>(HttpStatus.OK, "Order created successfully", response, true);
		} catch (RazorpayException e) {
			logger.error("Order creation failed: {}", e.getMessage(), e);
			return new CustomResponse<>(HttpStatus.BAD_REQUEST, "Error creating Razorpay order", null,
					false);
		} catch (Exception e) {
			logger.error("Order creation failed: {}", e.getMessage(), e);
			return new CustomResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Error creating Razorpay order",
					null, false);
		}
    }

    public Boolean verifyPayment(String paymentId, String orderId, String signature) {
    	try {
			String payload = orderId + "|" + paymentId;

			Mac sha256Hmac = Mac.getInstance("HmacSHA256");
			SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "HmacSHA256");
			sha256Hmac.init(secretKeySpec);

			byte[] hash = sha256Hmac.doFinal(payload.getBytes());

			StringBuilder hexString = new StringBuilder();
			for (byte b : hash) {
				String hex = Integer.toHexString(0xff & b);
				if (hex.length() == 1)
					hexString.append('0');
				hexString.append(hex);
			}

			String expectedSignature = hexString.toString();

			return expectedSignature.equals(signature);
		} catch (Exception e) {
			logger.error("Exception during signature verification: ", e);
			return false;
		}
    }

    public PaymentResponse getPaymentDetails(String paymentId) {
        try {
            Payment payment = razorpayClient.payments.fetch(paymentId);
            
            return new PaymentResponse(
                payment.get("order_id").toString(),
                paymentId,
                payment.get("status").toString(),
                "Payment details retrieved successfully"
            );
            
        } catch (RazorpayException e) {
            return new PaymentResponse(null, "Failed to fetch payment details: " + e.getMessage());
        } catch (Exception e) {
            return new PaymentResponse(null, "Internal server error: " + e.getMessage());
        }
    }
} 