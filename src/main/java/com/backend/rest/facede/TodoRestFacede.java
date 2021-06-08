package com.backend.rest.facede;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

@Path("/todo")
public class TodoRestFacede {

	@GET
	public String executaGET() {
		return "teste GET servidor";
	}

	@POST
	public String executaPOST() {
		return "teste POST servidor";
	}

	@DELETE
	public String executaDELETE() {
		return "teste DELETE servidor";
	}

}