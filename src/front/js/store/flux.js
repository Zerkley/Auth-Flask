import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token:"",
			user:{},
			logged:false,

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			// FUNCION PARA CREAR USUARIO

			signup: async (dataEmail, dataPassword) => {

				try {

					const response = await axios.post(process.env.BACKEND_URL + "/api/signup", {						
						email: dataEmail,
						password: dataPassword,
						
					});

					const data = response.data;

					setStore({
						user: {						
							"email": dataEmail,
							"password": dataPassword,
							"id": data.user.id
						},
					});

					console.log(response.data)
					return true;

				} catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
			},


			// FUNCION PARA LOGIN

			login: async (dataEmail, dataPassword) => {
				try {

					const response = await axios.post(process.env.BACKEND_URL + "/api/login", {
						email: dataEmail,
						password: dataPassword
					});

					const data = response.data;

					setStore({

						user: data.user,
						token: data.token,
						logged: true

					});
					return true;

				} catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
			},

			// FUNCION PARA LOGOUT

			logout: () => {


				console.log("Deslogando");
				sessionStorage.removeItem("token");
				setStore({
					logged: false,
					token: "",
				});


			},
		}
	};
};

export default getState;
