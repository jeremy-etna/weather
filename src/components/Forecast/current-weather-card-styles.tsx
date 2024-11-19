import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        paddingBottom: 16,
        marginVertical: 8,
        alignItems: 'center',
        display: 'flex'
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