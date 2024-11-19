import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(1, 1, 1, 0.2)',
        padding: 8,
        marginVertical: 8,
        marginRight: 16,
        borderRadius: 16,
    },
    cityName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    location: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 80,
        height: 80,
        marginRight: 16,
    },
    temperature: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    temperatureDetails: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    unit: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 20
    },
    weatherCondition: {
        fontSize: 16,
        color: 'white',
    },
});
