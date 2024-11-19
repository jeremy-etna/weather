import { StyleSheet } from 'react-native';



export const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    maxWidth: 325,
    maxHeight: 250,
    backgroundColor: 'rgba(1, 1, 1, 0.2)',
    borderRadius: 16,
  },
  cardText: {
    fontSize: 14,
    color: 'white',
    paddingTop: 8,
    paddingLeft: 8,
  },
  item: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherCondition: {
    fontSize: 16,
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 40,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

