import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Divider />
                <View style={styles.imageContainer}>
                    <Card.Image source={require('./imagenes/40Años.png')} style={styles.cardImage} />
                    <Text style={styles.overlayTitle}>{excursion.nombre}</Text>
                </View>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: 200, // Ajusta la altura según sea necesario
    },
    overlayTitle: {
        position: 'absolute',
        top: 10, // Ajusta la posición vertical
        left: 0, // Ajusta la posición horizontal
        right: 0, // Ajusta la posición horizontal
        textAlign: 'center',
        color: 'chocolate',
        fontSize: 30,
        fontWeight: 'bold',
        //backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fondo semitransparente opcional
        padding: 5, // Espaciado interno opcional
    }
});

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES
        };
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (<RenderExcursion excursion={this.state.excursiones[+excursionId]} />);
    }
}

export default DetalleExcursion;