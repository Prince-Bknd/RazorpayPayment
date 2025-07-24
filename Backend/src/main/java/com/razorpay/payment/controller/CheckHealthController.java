package com.razorpay.payment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.payment.response.ApplicationHealthResponse;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class CheckHealthController {
	
	ApplicationHealthResponse aplicationHealthResponse = new ApplicationHealthResponse();
	
	@GetMapping("/health")
    public ResponseEntity<ApplicationHealthResponse> healthCheck() {
		aplicationHealthResponse.setStatus("UP");
		aplicationHealthResponse.setMessage("Payment service is running");
		
        return ResponseEntity.ok(aplicationHealthResponse);
    }
}