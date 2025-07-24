package com.razorpay.payment.service;

import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.payment.model.PaymentRequest;
import com.razorpay.payment.model.PaymentResponse;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private RazorpayClient razorpayClient;
    
    @Value("${razorpay.key.id}")
    private String keyId;
    
    @Value("${razorpay.key.secret}")
    private String keySecret;

    public PaymentResponse createOrder(PaymentRequest paymentRequest) {
        try {
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", paymentRequest.getAmount());
            orderRequest.put("currency", paymentRequest.getCurrency());
            orderRequest.put("receipt", paymentRequest.getReceipt());
            
            // Add customer details
            JSONObject notes = new JSONObject();
            notes.put("customer_name", paymentRequest.getCustomerName());
            notes.put("customer_email", paymentRequest.getCustomerEmail());
            notes.put("customer_phone", paymentRequest.getCustomerPhone());
            if (paymentRequest.getDescription() != null) {
                notes.put("description", paymentRequest.getDescription());
            }
            orderRequest.put("notes", notes);

            Order order = razorpayClient.orders.create(orderRequest);
            
            return new PaymentResponse(
                order.get("id").toString(),
                null,
                "created",
                "Order created successfully"
            );
            
        } catch (RazorpayException e) {
            return new PaymentResponse("RAZORPAY_ERROR", "Failed to create order: " + e.getMessage());
        } catch (Exception e) {
            return new PaymentResponse("INTERNAL_ERROR", "Internal server error: " + e.getMessage());
        }
    }

    public PaymentResponse verifyPayment(String paymentId, String orderId, String signature) {
        try {
            // Fetch payment details to verify
            Payment payment = razorpayClient.payments.fetch(paymentId);
            
            // Check if payment belongs to the order
            if (payment.get("order_id").toString().equals(orderId)) {
                return new PaymentResponse(
                    orderId,
                    paymentId,
                    "verified",
                    "Payment verified successfully"
                );
            } else {
                return new PaymentResponse("ORDER_MISMATCH", "Payment does not belong to the specified order");
            }
            
        } catch (RazorpayException e) {
            return new PaymentResponse("RAZORPAY_ERROR", "Failed to verify payment: " + e.getMessage());
        } catch (Exception e) {
            return new PaymentResponse("INTERNAL_ERROR", "Internal server error: " + e.getMessage());
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
            return new PaymentResponse("RAZORPAY_ERROR", "Failed to fetch payment details: " + e.getMessage());
        } catch (Exception e) {
            return new PaymentResponse("INTERNAL_ERROR", "Internal server error: " + e.getMessage());
        }
    }
} 