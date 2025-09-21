import { useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../../firebase';

export default function HabitList() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchHabits = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const user = auth.currentUser;
        if (!user) {
          setErrorMsg('User not logged in.');
          setHabits([]);
          setLoading(false);
          return;
        }
        const q = query(collection(db, 'habits'), where('userId', '==', user.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHabits(data);
      } catch (error) {
        setErrorMsg('Failed to load habits.');
      } finally {
        setLoading(false);
      }
    };
    fetchHabits();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.7}
      onPress={() => router.push({ pathname: '/habit/edit', params: { id: item.id } })}
    >
      <Text style={styles.title}>{item.title}</Text>
      {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/home1')}>
        <Text style={styles.homeButtonText}>◀back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>My Habits</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4B7BEC" style={styles.loading} />
      ) : errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : habits.length === 0 ? (
        <Text style={styles.emptyText}>You have no habits yet. Start adding some!</Text>
      ) : (
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f0fe',
    padding: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2e3a59',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e2d55',
  },
  desc: {
    fontSize: 14,
    color: '#6b7a99',
    marginTop: 6,
  },
  loading: {
    marginTop: 40,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7a99',
    textAlign: 'center',
    marginTop: 30,
  },
  homeButton: {
    position: 'left',
    top: 2,
    right: 20,
    backgroundColor: '#6175e9aa',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    elevation: 2,
    width: 80,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2e3a59',
  },
});