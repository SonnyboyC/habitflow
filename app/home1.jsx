import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Button, StyleSheet, Text, View } from 'react-native';
import { auth } from '../firebase';

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HabitFlow!!!</Text>

      <View style={styles.buttonGroup}>
        <Button title="View Habits" onPress={() => router.push('habit/list')} />
        <Button title="Add Habit" onPress={() => router.push('habit/add')} />
        
      </View>

      <View style={styles.logoutButton}>
        <Button title="Logout" color="#e63946" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#2c3e50',
  },
  buttonGroup: {
    gap: 12,
    marginBottom: 40,
    
  },
  logoutButton: {
    marginTop: 24,
  },
});