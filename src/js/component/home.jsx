import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [tarea, addTarea] = useState([]);
	const [input, setInput] = useState("");
	function traerInfo() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/daninzrth")
			.then((response) => response.json())
			.then((result) => addTarea(result))
			.catch((error) => console.log("error", error));
	}

	function editarInfo() {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(tarea);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/daninzrth",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	}

	useEffect(() => {
		traerInfo();
	}, []);
	useEffect(() => {
		if (tarea.length > 0) {
			editarInfo();
		}
	}, [tarea]);

	function borrar(i) {
		let newArray = tarea.map((item) => ({ ...item }));
		newArray[i].done = true;
		addTarea(newArray);
	}

	const Pendientes = () => {
		let cantidad = tarea.filter((item) => {
			return !item.done;
		}).length;
		if (cantidad == 0) {
			return <p>No tienes tareas pendientes, buen trabajo!</p>;
		} else {
			return (
				<p>
					Tienes <b>{cantidad}</b> tareas por hacer!
				</p>
			);
		}
	};

	const tareas = tarea.map((object, i) => {
		if (tarea[i].done == false) {
			return (
				<li key={i} className="">
					<span>
						<button
							onClick={() => {
								borrar(i);
							}}>
							<i className="far fa-trash-alt" />
						</button>
					</span>
					{object.label}
				</li>
			);
		}
	});
	function handleKeyPress(e) {
		if (e.key === "Enter") {
			addTarea([...tarea, { label: input, done: false }]);
			setInput("");
		}
	}

	return (
		<div className="container todo">
			<div className="row">
				<h1>ToDo List</h1>
			</div>
			<div className="row">
				<input
					type="text"
					placeholder="Agregar nueva tarea"
					onKeyPress={handleKeyPress}
					onChange={(e) => setInput(e.target.value)}
					value={input}
				/>
			</div>
			<div>
				<ul>{tareas}</ul>
			</div>
			<div className="pendientes">
				<Pendientes />
			</div>
		</div>
	);
};

export default Home;
