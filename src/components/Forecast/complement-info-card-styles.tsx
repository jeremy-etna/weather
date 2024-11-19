import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
        margin: 16,
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width: 325,
        backgroundColor: 'rgba(1, 1, 1, 0.2)',
        borderRadius: 16,
        alignContent: 'space-around',
    },
    infoGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoValue: {
        fontSize: 16,
        //color: 'white',
    },
});
