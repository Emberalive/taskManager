import { DateInput, SimpleForm, TextInput } from "react-admin";
import {useState} from "react";
export default function AddReminder () {

    const [currentReminder, setCurrentReminder] = useState("");

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            zIndex: 100,
            top: "300px",
            height: '200px',
            width: '100%',
        }}>
            <section style={{
                width: '400px',
                backgroundColor: 'var(--primary)',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
            }}>
                <h2 style={{
                    width: '100%',
                    textAlign: 'center',
                }}>Add Reminder</h2>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: "10px",
                }}>
                    <input
                        type="date"
                        name="reminder"
                        value={Date.now()}
                        onChange={(e) => setCurrentReminder(e.target.value)}
                        style={{
                            outline: 'none',
                            border: 'none',
                            padding: '10px',
                            fontSize: '14px',
                            font: 'inherit',
                            borderRadius: '10px',
                            backgroundColor: 'var(--neutral)',
                        }}
                    />
                    <p style={{
                        padding: '10px',
                        color: 'white',
                        backgroundColor: 'var(--neutral)',
                        width: 'fit-content',
                        borderRadius: '10px',
                    }}>{currentReminder}</p>
                </div>

            </section>
        </div>
    )
}