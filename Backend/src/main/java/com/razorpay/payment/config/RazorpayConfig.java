package com.razorpay.payment.config;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RazorpayConfig {

    @Value("${razorpay.key_id:}")
    private String keyId;

    @Value("${razorpay.key_secret:}")
    private String keySecret;

    public String getKeyId() {
        return keyId;
    }

    public void setKeyId(String keyId) {
        this.keyId = keyId;
    }

    public String getKeySecret() {
        return keySecret;
    }

    public void setKeySecret(String keySecret) {
        this.keySecret = keySecret;
    }

    @Bean
    public RazorpayClient razorpayClient() throws RazorpayException {
        if (keyId == null || keyId.isEmpty() || keySecret == null || keySecret.isEmpty()) {
            throw new RazorpayException("Razorpay credentials not configured");
        }
        return new RazorpayClient(keyId, keySecret);
    }
} 