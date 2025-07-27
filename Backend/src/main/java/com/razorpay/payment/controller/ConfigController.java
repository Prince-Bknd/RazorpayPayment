package com.razorpay.payment.controller;

import com.razorpay.payment.config.RazorpayConfig;
import com.razorpay.payment.response.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/config")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ConfigController {

    @Autowired
    private RazorpayConfig razorpayConfig;

    @Value("${server.port:5000}")
    private int serverPort;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getConfig() {
        Map<String, Object> config = new HashMap<>();
        
        // Check if Razorpay is configured
        boolean isConfigured = razorpayConfig.getKeyId() != null && 
                              !razorpayConfig.getKeyId().isEmpty() &&
                              razorpayConfig.getKeySecret() != null && 
                              !razorpayConfig.getKeySecret().isEmpty();
        
        config.put("razorpayConfigured", isConfigured);
        config.put("port", serverPort);
        
        // Only return the key ID if configured (never return the secret)
        if (isConfigured) {
            config.put("razorpayKeyId", razorpayConfig.getKeyId());
        } else {
            config.put("razorpayKeyId", "");
        }
        
        return ResponseEntity.ok(config);
    }

    @PostMapping("/razorpay")
    public ResponseEntity<CustomResponse<String>> updateRazorpayConfig(@RequestBody Map<String, String> config) {
        try {
            String keyId = config.get("keyId");
            String keySecret = config.get("keySecret");
            
            if (keyId == null || keyId.trim().isEmpty() || 
                keySecret == null || keySecret.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new CustomResponse<>(HttpStatus.BAD_REQUEST, "Key ID and Key Secret are required", null, false));
            }
            
            // Update the configuration
            razorpayConfig.setKeyId(keyId.trim());
            razorpayConfig.setKeySecret(keySecret.trim());
            
            return ResponseEntity.ok(new CustomResponse<>(HttpStatus.OK, "Configuration updated successfully", "OK", true));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new CustomResponse<>(HttpStatus.BAD_REQUEST, "Failed to update configuration: " + e.getMessage(), null, false));
        }
    }
} 