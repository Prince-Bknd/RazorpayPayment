package com.razorpay.payment.controller;

import com.razorpay.payment.request.PaymentRequest;
import com.razorpay.payment.response.CustomResponse;
import com.razorpay.payment.response.PaymentOrderResponse;
import com.razorpay.payment.response.PaymentResponse;
import com.razorpay.payment.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<CustomResponse<PaymentOrderResponse>> createOrder(@Valid @RequestBody PaymentRequest paymentRequest) {
    	CustomResponse<PaymentOrderResponse> response = paymentService.createOrder(paymentRequest);
        
        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<Boolean> verifyPayment(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("orderId") String orderId,
            @RequestParam("signature") String signature) {
        
        try {
            System.out.println("=== PAYMENT VERIFICATION START ===");
            System.out.println("Received parameters:");
            System.out.println("  PaymentId: " + paymentId);
            System.out.println("  OrderId: " + orderId);
            System.out.println("  Signature: " + signature);
            System.out.println("  PaymentId length: " + (paymentId != null ? paymentId.length() : "null"));
            System.out.println("  OrderId length: " + (orderId != null ? orderId.length() : "null"));
            System.out.println("  Signature length: " + (signature != null ? signature.length() : "null"));
            
            Boolean response = paymentService.verifyPayment(paymentId, orderId, signature);
            
            System.out.println("Verification result: " + response);
            System.out.println("=== PAYMENT VERIFICATION END ===");
            
            if (response) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            System.err.println("Error during payment verification: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(false);
        }
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<PaymentResponse> getPaymentDetails(@PathVariable String paymentId) {
        PaymentResponse response = paymentService.getPaymentDetails(paymentId);
        
        if (response.getStatus() != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/test-config")
    public ResponseEntity<String> testConfig() {
        return ResponseEntity.ok("Backend is running. Key ID: " + paymentService.getKeyId() + ", Secret Key length: " + paymentService.getSecretKey().length());
    }
    
    @PostMapping("/test-verify")
    public ResponseEntity<String> testVerify(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("orderId") String orderId,
            @RequestParam("signature") String signature) {
        
        try {
            System.out.println("=== TEST VERIFICATION ===");
            System.out.println("PaymentId: " + paymentId);
            System.out.println("OrderId: " + orderId);
            System.out.println("Signature: " + signature);
            System.out.println("Secret Key: " + paymentService.getSecretKey());
            
            Boolean result = paymentService.verifyPayment(paymentId, orderId, signature);
            
            System.out.println("Verification result: " + result);
            System.out.println("=== END TEST ===");
            
            return ResponseEntity.ok("Verification result: " + result);
        } catch (Exception e) {
            System.err.println("Test verification error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
} 