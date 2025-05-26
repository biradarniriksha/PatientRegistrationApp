export const channel = new BroadcastChannel('patients-channel')

export const broadcastUpdate = () => {
  channel.postMessage(JSON.stringify({ type: 'patient-added' }))
}
