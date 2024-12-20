import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const registerForPushNotificationsAsync = async () => {
    try {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('Notification permissions not granted!');
            return;
        }
    } catch (error) {
        console.error('Error during notification permission setup:', error);
    }
};

const scheduleNotification = async (title: string, body: string, data?: any, seconds = 1) => {
    try {
        const { status } = await Notifications.getPermissionsAsync();

        if (status !== 'granted') {
            console.log('Notification permissions not granted.');
            return;
        }

        await Notifications.scheduleNotificationAsync({
          content: {
            title,
            body,
            data,
          },
          trigger: {
            type : Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: seconds,
            repeats: false,
          },
        });
        
    } catch (error) {
        console.error('Error scheduling notification:', error);
    }
};

export { registerForPushNotificationsAsync, scheduleNotification };