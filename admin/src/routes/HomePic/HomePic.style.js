import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

export const UploadArea = styled.div`
    border: 2px dashed #007bff;
    padding: 20px;
    cursor: pointer;
    margin-bottom: 20px;
`;

export const ImageList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    width: 100%;
`;

export const ImageWrapper = styled.div`
    position: relative;
`;

export const Image = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
`;

export const DeleteIcon = styled.img`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    padding: 2px;
`;
