import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Card, Icon, ListItem } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios
    }
}

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Divider />
                <View style={styles.imageContainer}>
                    <Card.Image source={{uri: baseUrl + excursion.imagen}} style={styles.cardImage} />
                    <Text style={styles.overlayTitle}>{excursion.nombre}</Text>
                </View>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                <Icon
                    raised
                    reverse
                    name={props.favorita ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                />
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

function RenderComentario(props) {
    const comentarios = props.comentarios;

    const renderComentarioItem = ({ item, index }) => {
        // Convertir la fecha al formato deseado
        const fecha = new Date(item.dia.replace(/\s/g, ""));
        const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
        const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);

        return (
            <>
                <ListItem
                    key={index}>
                    <ListItem.Content>
                        <ListItem.Title>{item.comentario}</ListItem.Title>
                        <ListItem.Subtitle>{item.valoracion + ' Stars'}</ListItem.Subtitle>
                        <ListItem.Subtitle>{'-- ' + item.autor + ', ' + fechaFormateada + ', ' + horaFormateada}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </>
        );
    };

    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider />
            <FlatList
                data={comentarios}
                renderItem={renderComentarioItem}
                keyExtractor={item => item.id.toString()}
                scrollEnabled={false}
            />
        </Card>
    )
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
        color: 'white',
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
            favoritos: []
        };
    }

    marcarFavorito(excursionId) {
        this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.state.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(DetalleExcursion);