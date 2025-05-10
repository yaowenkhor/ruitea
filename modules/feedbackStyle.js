import { StyleSheet } from "react-native";

export const feedbackStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FAF9F6'
    },
    title: {
        fontSize: 24,
        fontFamily: 'Gantari-Bold',
        color: '#4A6B57',
        marginBottom: 30,
        textAlign: 'center'
    },
    ratingContainer: {
        marginBottom: 30,
        alignItems: 'center'
    },
    ratingLabel: {
        fontSize: 18,
        fontFamily: 'Gantari-Bold',
        color: '#333',
        marginBottom: 15
    },
    commentContainer: {
        marginBottom: 30
    },
    commentLabel: {
        fontSize: 16,
        fontFamily: 'Gantari-Bold',
        color: '#333',
        marginBottom: 10
    },
    commentInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        height: 150,
        fontFamily: 'Gantari-Bold',
        color: '#333',
        textAlignVertical: 'top'
    },
    submitButton: {
        backgroundColor: '#4A6B57',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20
    },
    submitButtonText: {
        color: '#fff',
        fontFamily: 'Gantari-Bold',
        fontSize: 16
    }
})