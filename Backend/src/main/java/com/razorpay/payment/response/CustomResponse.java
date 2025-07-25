package com.razorpay.payment.response;

import org.springframework.http.HttpStatus;

public class CustomResponse<T> {
	private Boolean success;
	private HttpStatus status;
	private String message;
	private T data;
	
	public CustomResponse(HttpStatus status, String message, T data, Boolean success) {
		this.status = status;
		this.message = message;
		this.data = data;
		this.success = success;
	}
	
	public Boolean getSuccess() {
		return success;
	}
	public void setSuccess(Boolean success) {
		this.success = success;
	}
	public HttpStatus getStatus() {
		return status;
	}
	public void setStatus(HttpStatus status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	
	
}