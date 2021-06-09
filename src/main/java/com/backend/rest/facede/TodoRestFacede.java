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
@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
@Consumes(MediaType.APPLICATION_JSON)
public class TodoRestFacede {

	private static List<TodoModel> todoList = new ArrayList<TodoModel>();
	
	static {
		todoList.add(new TodoModel(1,"Terminar Projeto", true));
		todoList.add(new TodoModel(2,"Terminar Projeto2", false));
		todoList.add(new TodoModel(3,"Terminar Projeto3", true));
		todoList.add(new TodoModel(4,"Terminar Projeto4", true));
		todoList.add(new TodoModel(5,"Terminar Projeto5", false));
		todoList.add(new TodoModel(6,"Terminar Projeto6", false));
	}
	
	@GET
	public List<TodoModel> getTodos() {
		return todoList;
	}

	@POST
	public TodoModel salvarTodo(TodoModel novoTodo) {
		todoList.add(novoTodo);
		return novoTodo;
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
		for(TodoModel todo : todoList) {
			if(todo.isStatus()) {
				listDelete.add(todo);
			}
		}
		todoList.removeAll(listDelete);
		System.out.println("executando");
	}
	
	@PUT
	public void atualizarStatus(TodoModel todo) {
		todoList.remove(todo);
		todoList.add(todo);
	}
}