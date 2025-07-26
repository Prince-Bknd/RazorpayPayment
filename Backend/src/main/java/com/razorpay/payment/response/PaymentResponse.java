package com.razorpay.payment.response;

public class PaymentResponse {
	private String orderId;
	private String paymentId;
	private String status;
	private String message;
	
	public PaymentResponse(String orderId, String paymentId, String status, String message) {
		this.orderId = orderId;
		this.paymentId = paymentId;
		this.status = status;
		this.message = message;
	}
	
	public PaymentResponse(String status, String message) {
		this.status = status;
		this.message = message;
	}

	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getPaymentId() {
		return paymentId;
	}
	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	
}
