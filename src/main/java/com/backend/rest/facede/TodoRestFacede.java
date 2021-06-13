package com.backend.rest.facede;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.backend.model.TodoModel;

@Path("/todo")
@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Consumes(MediaType.APPLICATION_JSON)
public class TodoRestFacede {
	static int id = 0;
	private boolean markAllTodo = false;
	
	private static List<TodoModel> todoList = new ArrayList<TodoModel>();

	@GET
	public List<TodoModel> getTodos() {
		return todoList;
	}

	@POST
	public TodoModel salvarTodo(String newTodo) {
		TodoModel novoTodo = new TodoModel(id, newTodo, false);
		todoList.add(novoTodo);
		id++;
		return novoTodo;
	}

	@PUT
	public void atualizarStatus(TodoModel todo) {
		System.out.println(todo.getId());
		if(todoList.get(todoList.indexOf(todo)).getTodo().equals(todo.getTodo())){
			boolean val = todoList.get(todoList.indexOf(todo)).isStatus();
			todoList.get(todoList.indexOf(todo)).setStatus(!val);
		}else {
			todoList.get(todoList.indexOf(todo)).setTodo(todo.getTodo());
		}
	}
	
	@PUT
	@Path("/allChecked/{allChecked}")
	public void markAllTodo(@PathParam("allChecked") Boolean status) {
		System.out.println("entrou aqui " + status);
		for(TodoModel todo : todoList) {
			todo.setStatus(status);
		}
	}

	@DELETE
	@Path("/{idTodo}")
	public void executaDELETE(@PathParam("idTodo") Integer idTodo) {
		TodoModel todo = new TodoModel();
		todo.setId(idTodo);
		todoList.remove(todo);
	}

	@DELETE
	public void executaDELETECompleted() {
		List<TodoModel> listDelete = new ArrayList<TodoModel>();
		for (TodoModel todo : todoList) {
			if (todo.isStatus()) {
				listDelete.add(todo);
			}
		}
		todoList.removeAll(listDelete);
	}

}