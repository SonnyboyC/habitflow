import { useLocalSearchParams, useRouter } from 'expo-router';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../../firebase';

export default function EditHabit() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadHabit = async () => {
      const ref = doc(db, 'habits', id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setTitle(data.title);
        setDescription(data.description);
      } else {
        alert('Habit not found');
        router.back();
      }
    };
    loadHabit();
  }, []);

  const handleUpdate = async () => {
    const ref = doc(db, 'habits', id);
    await updateDoc(ref, {
      title,
      description,
    });
    router.push('/habit/list');
  };

  const handleDelete = async () => {
    const ref = doc(db, 'habits', id);
    await deleteDoc(ref);
    router.push('/habit/list');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Habit</Text>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
      <Button title="Update" onPress={handleUpdate} />
      <View style={{ height: 10 }} />
      <Button title="Delete" color="red" onPress={handleDelete} />
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
