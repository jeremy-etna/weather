import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { styles } from './search-bar-styles'

interface SearchBarProps {
    onSubmit: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const [term, setTerm] = useState('');

    const handleSubmit = () => {
        onSubmit(term);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Rechercher..."
                value={term}
                onChangeText={setTerm}
                autoCorrect={false}
                autoCapitalize="none"
                onSubmitEditing={handleSubmit}
            />
        </View>
    );
};

export default SearchBar;
