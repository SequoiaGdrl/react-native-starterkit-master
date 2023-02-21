import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function SignInScreen({ setToken }) {
	const navigation = useNavigation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const fetchData = async () => {
		try {
			const response = await axios.post(
				"https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
				{ email: email, password: password }
			);
			console.log(response.data);
			if (response.data.token) {
				setToken(response.data.token);
			} else {
				console.log("La connexion a échoué");
			}
		} catch (error) {
			console.log(error.response.data);
		}
	};

	return (
		<View>
			<View>
				<Text>email: </Text>
				<TextInput
					placeholder="email"
					value={email}
					onChangeText={(input) => {
						setEmail(input);
					}}
				/>
				<Text>Password: </Text>
				<TextInput
					placeholder="Password"
					secureTextEntry={true}
					value={password}
					onChangeText={(input) => {
						setPassword(input);
					}}
				/>
				<Button
					title="Sign in"
					onPress={async () => {
						await fetchData();
					}}
				/>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("SignUp");
					}}
				>
					<Text>Create an account</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
