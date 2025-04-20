import React, { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface'; 

const CandidateSearch: React.FC = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        // Fetch candidates data from an API or a mock data source
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        // Replace with actual API call
        const response = await fetch('https://api.github.com/users'); // Example API
        const data = await response.json();
        setCandidates(data);
    };

    const saveCandidate = () => {
        if (candidates[currentIndex]) {
            setSavedCandidates([...savedCandidates, candidates[currentIndex]]);
            nextCandidate();
        }
    };

    const nextCandidate = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % candidates.length);
    };

    const previousCandidate = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + candidates.length) % candidates.length);
    };

    if (candidates.length === 0) {
        return <div>No candidates available to review.</div>;
    }

    const currentCandidate = candidates[currentIndex];

    return (
        <div>
            <h2>Candidate Search</h2>
            <div>
                <img src={currentCandidate.avatar} alt={currentCandidate.name} />
                <h3>{currentCandidate.name}</h3>
                <p>Username: {currentCandidate.username}</p>
                <p>Location: {currentCandidate.location}</p>
                <p>Email: {currentCandidate.email}</p>
                <p>Company: {currentCandidate.company}</p>
                <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">Profile</a>
            </div>
            <button onClick={saveCandidate}>+</button>
            <button onClick={previousCandidate}>Previous</button>
            <button onClick={nextCandidate}>Next</button>
            {savedCandidates.length === 0 && <p>No candidates have been accepted.</p>}
        </div>
    );
};

export default CandidateSearch;