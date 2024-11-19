import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    maxWidth: 325,
    maxHeight: 125,
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
    marginHorizontal: 8,
    display: 'flex',
    paddingTop: 8,
    paddingBottom: 8,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  weatherCondition: {
    fontSize: 12,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
