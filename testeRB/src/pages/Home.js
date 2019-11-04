import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, StyleSheet, Image, Switch,
  TextInput, KeyboardAvoidingView, TouchableOpacity,
} from 'react-native';

import api from '../services/api';
import lupa from '../assets/search.png'

export default function Home() {

  const [celsiusIsFalse, setCelsiusIsFalse] = useState(false);

  const [inputSearch, setInputSearch] = useState('São Paulo');
  const [dataCity, setDataCity] = useState([]);
  const [listDataCity, setListDataCity] = useState([]);

  useEffect(() => {
    getWoeId();
  }, [])

  if (celsiusIsFalse) {
    var the_temp_f = []
    var f = 0

    listDataCity.map((e) => {
      f = ((9 * e.the_temp + (32 * 5)) / 5)
      the_temp_f.push(f)
    })
  }

  async function getData(Id) {
    api.get(`/api/location/${Id}`)
      .then((response) => {
        setDataCity(response.data.consolidated_weather[0]);
        setListDataCity(response.data.consolidated_weather);
      })
      .catch(() => {
        alert('Erro de conexão')
      });
  }

  async function getWoeId() {
    api.get(`/api/location/search/?query=${inputSearch}`)
      .then((response) => {
        getData(response.data[0].woeid);
      })
      .catch(() => {
        alert('Não encontramos nenhum resultado para esse termo de pesquisa.')
      });
  }

  return (
    <KeyboardAvoidingView enabled
      style={styles.container}>
      {listDataCity.length > 0 ?
        < ScrollView
          contentContainerStyle={{ flexGrow: 1, }}
          showsVerticalScrollIndicator={false} >

          <View style={styles.areaSearch}>
            <TextInput style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={text => setInputSearch(text)}
              value={inputSearch}
            />
            <TouchableOpacity style={styles.iconSearch} onPress={() => getWoeId()}>
              <Image style={styles.iconSearchImg} source={lupa}></Image>

            </TouchableOpacity>
          </View>
          <View style={styles.areaInfo}>
            <Image style={styles.areaInfoImg} source={{ uri: `https://www.metaweather.com/static/img/weather/png/64/${dataCity.weather_state_abbr}.png` }}></Image>
            <Text style={styles.areaInfoTemp}>{Math.round(dataCity.the_temp) + '°'}</Text>
            <View style={styles.areaInfoState}>
              <Text style={styles.areaInfoStateName}>{dataCity.weather_state_name}</Text>
              <Text style={styles.areaInfoMax}>{'max:  ' + Math.round(dataCity.max_temp) + '°'}</Text>
              <Text style={styles.areaInfoMin}>{'min:  ' + Math.round(dataCity.min_temp) + '°'}</Text>
            </View>
          </View>
          <View style={styles.areaNextDays}>
            {listDataCity.length > 0 ? listDataCity.map((element, index) => (
              <View style={styles.areaListDays} key={index}>
                <Text style={styles.areaListDaysDate}>{element.applicable_date.slice(8, 10) + '/' + element.applicable_date.slice(5, 7)}</Text>
                <Text style={styles.areaListDaysTemp}>{celsiusIsFalse ? Math.round(the_temp_f[index]) + '°' : Math.round(element.the_temp) + '°'}</Text>
                <Image style={styles.areaListDaysImg} source={{ uri: `https://www.metaweather.com/static/img/weather/png/64/${element.weather_state_abbr}.png` }}></Image>
              </View>
            )) : <View></View>}
          </View>
          <View style={styles.areaToggle}>
            <Text style={styles.areaToggleText}>{celsiusIsFalse ? 'Fahrenheit' : 'Celsius'}</Text>
            <Switch value={celsiusIsFalse} onValueChange={setCelsiusIsFalse}
            ></Switch>
          </View>

        </ScrollView>

        : <View></View>
      }
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00a6d0',
    paddingHorizontal: 10,
  },
  areaSearch: {
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: '#ffffff25',
    padding: 10,
    minWidth: 70,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    fontSize: 18,
    borderRadius: 35,
    borderColor: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    color: '#ffffff',
  },
  iconSearch: {
    position: 'relative',
    left: -60,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSearchImg: {
    height: 24,
    width: 24,
  },
  areaInfo: {
    borderRadius: 10,
    marginTop: 8,
    backgroundColor: '#ffffff25',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  areaInfoTemp: {
    fontSize: 60,
    color: '#ffffff',
  },
  areaInfoImg: {
    width: 64,
    height: 64,
  },
  areaInfoStateName: {
    color: '#FFF',
  },
  areaInfoMax: {
    color: '#FFF',
  },
  areaInfoMin: {
    color: '#FFF',
  },
  areaNextDays: {
    minHeight: '40%',
    borderRadius: 10,
    marginTop: 8,
    padding: 5,
    backgroundColor: '#ffffff25',
  },
  areaListDays: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  areaListDaysDate: {
    color: '#ffffff',
  },
  areaListDaysTemp: {
    color: '#ffffff',
  },
  areaListDaysImg: {
    width: 36,
    height: 36,
  },
  areaToggle: {
    borderRadius: 10,
    marginTop: 8,
    padding: 10,
    minHeight: 50,
    backgroundColor: '#ffffff25',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  areaToggleText: {
    color: '#FFF',
  },
});
