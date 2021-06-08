package com.backend.model;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class TodoModel implements Serializable {

	private static final long serialVersionUID = 1L;

	private int id;
	private String todo;
	private boolean status;

	public TodoModel() {
	}

	public TodoModel(int id, String todo, boolean status) {
		super();
		this.id = id;
		this.todo = todo;
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTodo() {
		return todo;
	}

	public void setTodo(String todo) {
		this.todo = todo;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TodoModel other = (TodoModel) obj;
		if (id != other.id)
			return false;
		return true;
	}

}