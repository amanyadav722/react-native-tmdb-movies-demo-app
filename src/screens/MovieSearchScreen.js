import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MovieSearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const searchMovies = async () => {
        if (!query) return;

        const apiURL = `https://api.themoviedb.org/3/search/movie?api_key=7008561cb2f105ee17b8a5d3b45f60a3&query=${query}`;
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            setResults(data.results);
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.detail}>Release Date: {item.release_date}</Text>
                    <Text style={styles.detail}>Rating: {item.vote_average}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search for a movie..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={searchMovies}
            />
            <Button title="Search" onPress={searchMovies} />
            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        marginHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    image: {
        width: 100,
        height: 150,
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    detail: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default MovieSearchScreen;