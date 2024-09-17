import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './Pages/Login';
import Register from './Pages/Register';
import HomePage from './Pages/HomePage';
import UserManagementScreen from './Pages/UserManagementScreen';
import AddVehicleScreen from './Pages/AddVehicleScreen';
import NearbyGarages from './Pages/NearbyGarages';
import IncidentReportScreen from './Pages/IncidentReportScreen';
import WarningLightsScreen from './Pages/WarningLightsScreen'; 

// יצירת Stack Navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// יצירת תפריט טאבים
function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomePage') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'User Management') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Add Vehicle') {
                        iconName = focused ? 'car' : 'car-outline';
                    } else if (route.name === 'Nearby Garages') {
                        iconName = focused ? 'construct' : 'construct-outline'; 
                    } else if (route.name === 'Warning Lights') {
                        iconName = focused ? 'warning' : 'warning-outline'; 
                    } else if (route.name === 'Incident Report') {
                        iconName = focused ? 'alert' : 'alert-outline'; 
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'purple',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            {/* דף הבית */}
            <Tab.Screen name="HomePage" component={HomePage} />
            {/* דף ניהול משתמשים */}
            <Tab.Screen name="User Management" component={UserManagementScreen} />
            {/* דף הוספת רכב */}
            <Tab.Screen name="Add Vehicle" component={AddVehicleScreen} />
            {/* דף מוסכים בקרבת מקום */}
            <Tab.Screen name="Nearby Garages" component={NearbyGarages} />
            {/* דף נורות חיווי */}
            <Tab.Screen name="Warning Lights" component={WarningLightsScreen} />
            {/* דף דיווח על תאונה */}
            <Tab.Screen name="Incident Report" component={IncidentReportScreen} />
        </Tab.Navigator>
    );
}

// האפליקציה הראשית
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {/* דף התחברות */}
                <Stack.Screen name="Login" component={Login} />
                {/* דף הרשמה */}
                <Stack.Screen name="Register" component={Register} />
                {/* מסכי טאב ראשיים */}
                <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
                {/* דף מוסכים בקרבת מקום */}
                <Stack.Screen name="NearbyGarages" component={NearbyGarages} />
                {/* דף דיווח על תאונה */}
                <Stack.Screen name="IncidentReportScreen" component={IncidentReportScreen} />
                {/* דף נורות חיווי */}
                <Stack.Screen name="WarningLightsScreen" component={WarningLightsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
