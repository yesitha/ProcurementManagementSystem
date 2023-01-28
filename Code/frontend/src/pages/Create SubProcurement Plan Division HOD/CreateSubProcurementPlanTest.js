return (



    

    <div style={{ display: "flex" }}>
      <CssBaseline />
      <SideNavBar list1={list1} list2={list2} user={user} />
      <Grid container>


        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <div className="Ph1">
                <IconButton sx={{ pl: '15px', height: '34px', width: '34px' }}><ArrowBackIosIcon sx={{ color: '#ffffff' }} /></IconButton>
                Sub Procurement Plan
              </div>
            </Grid>
          </Grid>
        </Grid>


        <Grid item xs={12}>
        
        </Grid>


        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
            
              <SearchNoFilter />
            </Grid>

          </Grid>
        </Grid>


        <Grid item xs={12}>
         
        </Grid>
        <Grid item xs={12}>


          <Grid container>
            <Button variant="contained">ADD ITEM</Button>
            <Button variant="contained">MODIFY ITEM</Button>
            <Button variant="contained">SUBMIT</Button>
          </Grid>


        </Grid>
      </Grid>

    </div>
  )