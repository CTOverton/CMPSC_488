import React from 'react'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";


const MemberLists = (props) => {
    return (
        <div>
            <Paper square>
                <Tabs
                    value={tab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                >
                    <Tab label="Active"/>
                    <Tab label="Signups"/>
                    <Tab label="Waitlist"/>
                    <Tab label="Scan QR"/>
                </Tabs>
            </Paper>
        </div>
    );
};

export default MemberLists