import React, { Component } from 'react';
import { Modal, Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Card, Icon, ListItem, Input, Button } from '@rneui/themed';
import { baseUrl, colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';
import { postComentario, postFavorito } from '../redux/ActionCreators';
import { Rating } from 'react-native-ratings';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))
})

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Divider />
                <View style={styles.imageContainer}>
                    <Card.Image source={{ uri: baseUrl + excursion.imagen }} style={styles.cardImage} />
                    <Text style={styles.overlayTitle}>{excursion.nombre}</Text>
                </View>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                <View style={styles.iconContainer}>
                    <Icon
                        raised
                        reverse
                        name={props.favorita ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color={colorGaztaroaOscuro}
                        onPress={() => props.onPress2()}
                    />
                </View>
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
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        marginBottom: 5,
        marginLeft: 5,
    },
    modalButtons: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
});

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valoracion: 3,
            autor: '',
            comentario: '',
            showModal: false
        };
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId);
    }

    gestionarComentario(excursionId) {
        this.props.postComentario(excursionId, this.state.valoracion, this.state.autor, this.state.comentario);
    }

    resetForm() {
        this.setState({
            valoracion: 3,
            autor: '',
            comentario: '',
            dia: '',
            showModal: false
        });
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                    onPress2={() => this.toggleModal()}
                />
                <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            type="star"
                            fractions={0}
                            startingValue={5}
                            imageSize={40}
                            onFinishRating={(value) => this.setState({ valoracion: value })}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                            placeholder="Autor"
                            style={styles.input}
                            value={this.state.autor}
                            onChangeText={(text) => this.setState({ autor: text })}
                            leftIcon={{
                                type: 'font-awesome',
                                name: 'user',
                                color: 'gray',
                            }}
                        />
                        <Input
                            placeholder="Comentario"
                            style={styles.input}
                            value={this.state.comentario}
                            onChangeText={(text) => this.setState({ comentario: text })}
                            leftIcon={{
                                type: 'font-awesome',
                                name: 'comment',
                                color: 'gray',
                            }}
                        />
                        <View style={styles.modalButtons}>
                            <Button
                                title="ENVIAR"
                                buttonStyle={{ backgroundColor: 'transparent' }}
                                titleStyle={{
                                    fontSize: 20,
                                    color: colorGaztaroaOscuro,
                                }}
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                    this.gestionarComentario(excursionId);
                                }}
                            />
                            <Button
                                title="CANCELAR"
                                buttonStyle={{ backgroundColor: 'transparent' }}
                                titleStyle={{
                                    fontSize: 20,
                                    color: colorGaztaroaOscuro,
                                }}
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);