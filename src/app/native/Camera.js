import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import io from 'socket.io-client'
import { serverIP, socketPort } from '../../../config'
const socket = io.connect('http://' + serverIP + ':' + socketPort)

export default () => {
    const [hasPermission, setHasPermission] = useState(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    const __takePicture = async (mode) => {
        const image = await camera.takePictureAsync({
            quality: 1.0,
            base64: true,
        })
        const binaryString = `${image.base64}data:image/jpg;base64,`
        socket.emit('inputImage', {
            image:binaryString,
            id: Date.now(),
            mode,
        })
    }

    if (hasPermission === null) {
        return <View />
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }
    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                ref={ref => camera = ref}
                flashMode={'on'}
                autoFocus={'on'}
                >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => __takePicture('write')}>
                        <Text style={styles.text}>WRITE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => __takePicture('erase')}>
                        <Text style={styles.text}>ERASE</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
})
