import { useState, useEffect } from "react";
import { 
  Alert, Platform,
  Text, TextInput, 
  View, KeyboardAvoidingView,
  Pressable,
  ScrollView,
 } from 'react-native';

import { auth, db} from "./src/lib/firebase";
import { 
  onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut
} from "firebase/auth";

import { 
  addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp 
} from "firebase/firestore";

type Note = {id: string, text: string};

export default function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Auth form
  const [email, setEmail] = useState("fjsilva@sp.senac.br");
  const [password, setPassword]= useState("a1b2c3");

  // DB Firestore 
  const [noteText, setNoteText] = useState("Primeira anotação");
  const [notes, setNotes] = useState<Note[]>([]);


  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <Text>Expo/React + Firebase(mínimo)</Text>
        <View>
          <Text>Auth</Text>
          <Text>Usuário logado: {userEmail ?? "nenhum"}</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="email"
            autoCapitalize="none"
          ></TextInput>
          <TextInput 
            value={password}
            onChangeText={setPassword}
            placeholder="senha"
            secureTextEntry
          ></TextInput>
          <View>
            <Pressable>
              <Text>Criar conta</Text>
            </Pressable>
            <Pressable>
              <Text>Login</Text>
            </Pressable>
            <Pressable>
              <Text>Logout</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Text>Firestore</Text>
          <TextInput
            value={noteText}
            onChangeText={setNoteText}
            placeholder="Texto da anotação"
          ></TextInput>
          <View>
            <Pressable><Text>Salvar nota</Text></Pressable>
            <Pressable><Text>Recarregar</Text></Pressable>
          </View>
          <View>
            {notes.map(n => (
              <Text key={n.id}>- {n.text}</Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

