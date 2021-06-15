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

import org.jboss.logging.Logger;

import com.backend.model.TodoModel;

@Path("/todo")
@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Consumes(MediaType.APPLICATION_JSON)
public class TodoRestFacede {

	private static int id = 0;

	private static List<TodoModel> todoList = new ArrayList<TodoModel>();

	private Logger logger = Logger.getLogger(TodoRestFacede.class.getSimpleName());

	@GET
	public List<TodoModel> getTodos() {
		

		return todoList;

	}

	@POST
	public TodoModel salvarTodo(String newTodo) {
	
		logger.info("Save newTodo: " + newTodo);

		TodoModel novoTodo = new TodoModel(id, newTodo, false);

		todoList.add(novoTodo);
		id++;

		return novoTodo;

	}

	@PUT
	public void atualizarTodo(TodoModel todo) {

		int index = todoList.indexOf(todo);
		String todoLista = todoList.get(index).getTodo();

		if (todoLista.equals(todo.getTodo())) {

			boolean status = todoList.get(index).isStatus();

			todoList.get(index).setStatus(!status);

			logger.info("updated " + todoLista + " to " + !status);

		} else {

			todoList.get(index).setTodo(todo.getTodo());
			logger.info("updated " + todoLista + " to " + todo.getTodo());

		}

	}

	@PUT
	@Path("/allChecked/{allChecked}")
	public void markAllTodo(@PathParam("allChecked") Boolean status) {
		
		logger.info("updated allChecked to " + status);

		for (TodoModel todo : todoList) {

			todo.setStatus(status);

		}
	}

	@DELETE
	@Path("/{idTodo}")
	public void executaDELETE(@PathParam("idTodo") Integer idTodo) {

		logger.info("deleted by Id: " + idTodo);

		TodoModel todo = new TodoModel();

		todo.setId(idTodo);
		todoList.remove(todo);

	}

	@DELETE
	public void executaDELETECompleted() {

		logger.info("delete allDeleted");

		List<TodoModel> listDelete = new ArrayList<TodoModel>();

		for (TodoModel todo : todoList) {

			if (todo.isStatus()) {

				listDelete.add(todo);

			}

		}

		todoList.removeAll(listDelete);
	}

}