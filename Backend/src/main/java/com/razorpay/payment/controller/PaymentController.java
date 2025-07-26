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
            @RequestParam String paymentId,
            @RequestParam String orderId,
            @RequestParam String signature) {
        
        Boolean response = paymentService.verifyPayment(paymentId, orderId, signature);
        
        if (response) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
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
} 