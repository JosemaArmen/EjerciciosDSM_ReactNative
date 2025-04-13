import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card } from '@rneui/themed';

function RenderItem() {

    const title = 'Información de contacto';

    const body1 = 'Kaixo Mendizale!'
    const body2 = 'Si quieres participar en las salidas de montaña \
que organizamos o quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros \
a través de diferentes medios. Puedes llamarnos por teléfono los jueves de las semanas \
que hay salida (de 20:00 a 21:00). También puedes ponerte en contacto con nosotros \
escribiendo un correo electrónico, o utilizando la aplicación de esta página web. Y \
además puedes seguirnos en Facebook.'
    const body3 = 'Y además puedes seguirnos en Facebook.\nPara lo que quieras, estamos a tu disposición!'
    const body4 = 'Tel: +34 948 277151'
    const body5 = 'Email: gaztaroa@gaztaroa.com'

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
            <Text style={{ margin: 5 }}>
                {body4}
            </Text>
            <Text style={{ margin: 5 }}>
                {body5}
            </Text>
        </Card>
    );
}

class Contacto extends Component {

    render() {

        return (
            <ScrollView>
                <RenderItem />
            </ScrollView>
        );
    }
}

export default Contacto;