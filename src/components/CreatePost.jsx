import { useState } from "react"
import { createImagePost } from "../api/imagePosts";
import { useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import styled from "styled-components";
import { Button } from "./Button";
import { Input } from "./Input";

export default function CreatePost({ onPostCreated }) {
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !caption) {
            alert("Fill up form completely to create post.");
            return;
        }

        try {
            setLoading(true);
            await createImagePost(file, caption);
            setFile(null);
            setCaption("");
            onPostCreated();
            navigate("/landing");
        } catch (err) {
            console.error(err);
            alert("Upload failed."); 
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form style={{ display: "flex", flexDirection: "column", justifyContent: "center", border: "1px solid black", textAlign: "Center" }} onSubmit={handleSubmit}>
                <Grid sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <Grid>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </Grid>
                    <Grid>
                        <CaptionInput value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption" size="small" />
                    </Grid>
                    <Grid>
                        <ButtonSubmit type="submit" disabled={loading}>
                            {loading ? "Creating Post..." : "Create Post"}
                        </ButtonSubmit>
                    </Grid>
                </Grid>
            </form>

        </>
    )
}

const ButtonSubmit = styled(Button)`
    width: 300px;
`;

const CaptionInput = styled(Input)`
    margin-top: 20px;
    width: 300px;
`;

