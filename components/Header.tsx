import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Header({ screen, navigation, openFilterModal }: any) {
	return (
		<View style={styles.header}>
			<Image style={styles.logo} source={require('../assets/images/logo.png')} />
			{screen == 'home' && (
				<View style={[styles.screenOptions, { justifyContent: 'space-between' }]}>
					<Pressable style={styles.optionIcon} onPress={() => navigation.navigate('')}>
						<AntDesign name='search1' size={22} />
					</Pressable>
					<Pressable style={styles.optionIcon} onPress={() => openFilterModal()}>
						<AntDesign name='filter' size={22} />
					</Pressable>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		marginTop: 10,
		height: 40,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	logo: {
		height: 70,
		width: '50%',
		resizeMode: 'contain'
	},
	screenOptions: {
		flex: 1,
		width: '100%',
		paddingHorizontal: 30,
		position: 'absolute',
		flexDirection: 'row'
	},
	optionText: {
		fontSize: 17,
		color: '#8B8B97'
	},
	optionIcon: {
		backgroundColor: '#F7F7F7',
		height: 40,
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100
	}
});
