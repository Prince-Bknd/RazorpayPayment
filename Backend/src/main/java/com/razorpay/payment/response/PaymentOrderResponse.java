package com.razorpay.payment.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PaymentOrderResponse {

	@JsonProperty("paymentId")
	private String paymentId;
	@JsonProperty("orderId")
	private String orderId;

	@JsonProperty("amount")
	private String amount;

	@JsonProperty("receiptId")
	private String receiptId;

	@JsonProperty("razorPayPaymentId")
	private String razorPayPaymentId;

	@JsonProperty("razorPayOrderId")
	private String razorPayOrderId;

	@JsonProperty("razorPaySignature")
	private String razorPaySignature;

	@JsonProperty("createdAt")
	private String created_at;

	public String getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getReceiptId() {
		return receiptId;
	}

	public void setReceiptId(String receiptId) {
		this.receiptId = receiptId;
	}

	public String getRazorPayPaymentId() {
		return razorPayPaymentId;
	}

	public void setRazorPayPaymentId(String razorPayPaymentId) {
		this.razorPayPaymentId = razorPayPaymentId;
	}

	public String getRazorPayOrderId() {
		return razorPayOrderId;
	}

	public void setRazorPayOrderId(String razorPayOrderId) {
		this.razorPayOrderId = razorPayOrderId;
	}

	public String getRazorPaySignature() {
		return razorPaySignature;
	}

	public void setRazorPaySignature(String razorPaySignature) {
		this.razorPaySignature = razorPaySignature;
	}

	public String getCreated_at() {
		return created_at;
	}

	public void setCreated_at(String created_at) {
		this.created_at = created_at;
	}

}
