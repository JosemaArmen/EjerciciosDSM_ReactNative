import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';
import { baseUrl } from '../comun/comun';

function RenderItem(props) {
    
        const item = props.item;
        
        if (item != null) {
            return(
                <Card>
                    <Card.Divider/>
                    <View style={styles.imageContainer}>
                        <Card.Image source={{uri: baseUrl + item.imagen}} style={styles.cardImage} />
                        <Text style={styles.overlayTitle}>{item.nombre}</Text>
                    </View>
                    <Text style={{margin: 20}}>
                        {item.descripcion}
                    </Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
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

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          excursiones: EXCURSIONES,
          cabeceras: CABECERAS,
          actividades: ACTIVIDADES
        };
    }

    render() {
        
        return(
            <ScrollView>
                <RenderItem item={this.state.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.state.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.state.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

export default Home;