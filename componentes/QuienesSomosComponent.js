import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';
import { FlatList } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        actividades: state.actividades
    }
}

function Historia() {

    const title = 'Un poquito de historia';
    const body1 = 'El nacimiento del club de montaña Gaztaroa se remonta a la \
primavera de 1976 cuando jóvenes aficionados a la montaña y \
pertenecientes a un club juvenil decidieron crear la sección \
montañera de dicho club. Fueron unos comienzos duros debido sobre \
todo a la situación política de entonces. Gracias al esfuerzo \
económico de sus socios y socias se logró alquilar una bajera. \
Gaztaroa ya tenía su sede social.'
    const body2 = 'Desde aquí queremos hacer llegar nuestro agradecimiento a todos \
los montañeros y montañeras que alguna vez habéis pasado por el \
club aportando vuestro granito de arena.'
    const body3 = 'Gracias!'

    return (
        <Card>
            <Card.Title>{title}</Card.Title>
            <Card.Divider />
            <Text style={{ margin: 5 }}>
                {body1}
            </Text>
            <Text style={{ margin: 5 }}>
                {body2}
            </Text>
            <Text style={{ margin: 5 }}>
                {body3}
            </Text>
        </Card>
    );
}

class QuienesSomos extends Component {

    render() {

        const renderQuienesSomosItem = ({ item, index }) => {
            return (
                <>
                    <Card.Divider />
                    <ListItem
                        key={index}>
                        <Avatar source={{uri: baseUrl + item.imagen}} />
                        <ListItem.Content>
                            <ListItem.Title>{item.nombre}</ListItem.Title>
                            <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </>
            );
        };

        return (
            <ScrollView>
                <Historia />
                <Card>
                    <Card.Title>{"Actividades y recursos"}</Card.Title>

                    <FlatList
                        data={this.props.actividades.actividades}
                        renderItem={renderQuienesSomosItem}
                        keyExtractor={item => item.id.toString()}
                        scrollEnabled={false}
                    />
                </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(QuienesSomos);