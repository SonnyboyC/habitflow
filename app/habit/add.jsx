import { useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth, db } from '../../firebase';

export default function AddHabit() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleAdd = async () => {
    if (!title) return alert('Title is required');

    try {
      await addDoc(collection(db, 'habits'), {
        userId: auth.currentUser.uid,
        title,
        description,
        createdAt: serverTimestamp(),
      });
      router.push('/habit/list');
    } catch (error) {
      alert('Error adding habit: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Habit</Text>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
      <Button title="Add Habit" onPress={handleAdd} />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', 
    alignItems: 'center',     
    backgroundColor: '#f9f9f9', 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', 
    textAlign: 'center',
  },
  input: {
    width: '100%', 
    maxWidth: 400, 
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: '#fff', 
  },
});
