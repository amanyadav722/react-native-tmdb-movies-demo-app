import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';

const PopularMoviesScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.btnSearchContainer} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.btnSearchText}>Search</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const fetchPopularMovies = async () => {
    const apiURL = 'https://api.themoviedb.org/3/movie/popular?api_key=7008561cb2f105ee17b8a5d3b45f60a3';
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}>
        <View style={styles.item}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
          <View style={styles.nameNdes}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.dte}>Release Date: {item.release_date}</Text>
            <Text style={styles.vote}>Rating: {item.vote_average}</Text>
            <Text style={styles.overview}>{item.overview}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={movies}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    margin: 4,
    flexShrink: 1,
  },
  overview: {
    fontSize: 12,
    margin: 4,
    flexShrink: 1,
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  nameNdes: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  btnSearchContainer: {
    marginRight: 10,
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'blue',
},
btnSearchText: {
    color: 'white',
},
  dte: {
    fontSize: 12,
    color: '#666',
    margin: 2,
  },
  vote: {
    fontSize: 12,
    color: '#666',
    margin: 2,
  },
});

export default PopularMoviesScreen;
