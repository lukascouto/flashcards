import { AsyncStorage } from "react-native"
import { Notifications, Permissions } from "expo"

const NOTIFICATION_KEY = "Flashcards:notification"

export const clearLocalNotification = async () => {
  await AsyncStorage.removeItem(NOTIFICATION_KEY)
  const response = await Notifications.cancelAllScheduledNotificationsAsync()
  return response
}

function createNotification() {
  return {
    title: `It's time to study!`,
    body: "👋 don't forget to study today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  }
}

export const setLocalNotification = async () => {
  const data = await AsyncStorage.getItem(NOTIFICATION_KEY)
  const isNotificationSet = JSON.parse(data)

  if (isNotificationSet === null) {
    const info = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    const { status } = info

    if (status === "granted") {
      await Notifications.cancelAllScheduledNotificationsAsync()

      let tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(20)
      tomorrow.setMinutes(0)

      Notifications.scheduleLocalNotificationAsync(createNotification(), {
        time: tomorrow,
        repeat: "day"
      })

      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
    }
  }
}

export const getIsLocalNotificationSet = async () => {
  const data = await AsyncStorage.getItem(NOTIFICATION_KEY)
  const isNotificationSet = JSON.parse(data)

  return isNotificationSet
}


export function formatDate(timestamp) {
    var monthName = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
    var data = new Date(timestamp);
    var day = data.getDate();
    var month = data.getMonth();
    month = monthName[month];
    var year = data.getFullYear();
    return [day, month, year].join(' ');
}


export function generateID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}