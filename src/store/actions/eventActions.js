export const createEvent = event => (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const { profile } = getState().firebase;
    const authorId = getState().firebase.auth.uid;
    console.log(profile);

    firestore
        .collection('events')
        .add({
            ...event,
            authorId,
            authorName: profile.name,
            participant: { total: 15, in: [], out: [] },
        })
        .then(res => {
            console.log(res);
            dispatch({ type: 'CREATE_EVENT', event: { ...event, id: res.id } });
        })
        .catch(err => {
            dispatch({ type: 'CREATE_EVENT_ERROR', err });
        });
};