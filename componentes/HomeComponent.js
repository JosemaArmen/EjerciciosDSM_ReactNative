import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        cabeceras: state.cabeceras,
        actividades: state.actividades
    }
}

function RenderItem(props) {

    const item = props.item;

    if (props.isLoading) {
        return (
            <IndicadorActividad />
        );
    }

    else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

    else {

        const item = props.item;

        if (item != null) {
            return (
                <Card>
                    <Card.Divider />
                    <View style={styles.imageContainer}>
                        <Card.Image source={{ uri: baseUrl + item.imagen }} style={styles.cardImage} />
                        <Text style={styles.overlayTitle}>{item.nombre}</Text>
                    </View>
                    <Text style={{ margin: 20 }}>
                        {item.descripcion}
                    </Text>
                </Card>
            );
        }
        else {
            return (<View></View>);
        }
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

    render() {

        return (
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]}
                    isLoading={this.props.cabeceras.isLoading}
                    errMess={this.props.cabeceras.errMess}
                />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]}
                    isLoading={this.props.excursiones.isLoading}
                    errMess={this.props.excursiones.errMess}
                />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]}
                    isLoading={this.props.actividades.isLoading}
                    errMess={this.props.actividades.errMess}
                />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);