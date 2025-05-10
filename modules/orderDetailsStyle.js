import { StyleSheet } from "react-native";

export const orderDetailStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FAF9F6',
    },
    title:{
        fontSize: 25,
        fontFamily: 'Gantari-Bold',
        color: 'black',
        marginBottom: 20,
    },
    detailsBox: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginVertical: 8,
        borderColor: '#f0f0f0',
        borderWidth: 1
    },
    orderCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        width: 80,
        height: 80,
        marginRight: 16,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
    },
    drinkImage: {
        width: '100%',
        height: '100%',
    },
    detailsContainer: {
        flex: 1,
    },
    drinkName: {
        fontSize: 18,
        fontFamily: 'Gantari-Bold',
        marginBottom: 8,
        color: '#4A6B57',
    },
    specRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    specLabel: {
        width: 70,
        fontFamily: 'Gantari-Bold',
        color: '#666',
    },
    specValue: {
        flex: 1,
        fontFamily: 'Gantari-Bold',
        color: '#333',
    },
    orderTitle: {
        fontSize: 24,
        fontFamily: 'Gantari-Bold',
        marginBottom: 20,
        color: '#355E3B',
        textAlign: 'center',
    },
    listContainer: {
        paddingBottom: 20,
    }
})